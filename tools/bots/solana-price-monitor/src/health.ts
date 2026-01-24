/**
 * HTTP Health Check Server
 * Provides a simple health endpoint for container orchestration
 */

import { createServer, type Server, type IncomingMessage, type ServerResponse } from 'node:http';

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  activeMonitors: number;
  lastPollTime: number | null;
  version: string;
}

export interface HealthServer {
  close: () => void;
}

// Global health state
let healthState: Omit<HealthStatus, 'uptime'> = {
  status: 'healthy',
  activeMonitors: 0,
  lastPollTime: null,
  version: '1.0.0',
};

const startTime = Date.now();

/**
 * Update health status (call from main bot loop)
 */
export function updateHealthStatus(updates: Partial<Omit<HealthStatus, 'uptime' | 'version'>>): void {
  healthState = { ...healthState, ...updates };
}

/**
 * Get current health status
 */
export function getHealthStatus(): HealthStatus {
  return {
    ...healthState,
    uptime: Math.floor((Date.now() - startTime) / 1000),
  };
}

/**
 * Handle health check request
 */
function handleHealthRequest(_req: IncomingMessage, res: ServerResponse): void {
  const status = getHealthStatus();

  // Determine HTTP status code based on health
  const httpStatus = status.status === 'unhealthy' ? 503 : 200;

  res.writeHead(httpStatus, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  });

  res.end(JSON.stringify(status, null, 2));
}

/**
 * Handle readiness check (is bot ready to receive traffic?)
 */
function handleReadinessRequest(_req: IncomingMessage, res: ServerResponse): void {
  const status = getHealthStatus();

  // Ready if healthy or degraded
  const isReady = status.status !== 'unhealthy';

  res.writeHead(isReady ? 200 : 503, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  });

  res.end(JSON.stringify({ ready: isReady }));
}

/**
 * Handle liveness check (is bot process alive?)
 */
function handleLivenessRequest(_req: IncomingMessage, res: ServerResponse): void {
  // Always return 200 if we can respond
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  });

  res.end(JSON.stringify({ alive: true }));
}

/**
 * Create and start health check server
 */
export function createHealthServer(port: number): Promise<HealthServer> {
  return new Promise((resolve, reject) => {
    const server: Server = createServer((req, res) => {
      const url = req.url || '/';

      switch (url) {
        case '/health':
        case '/healthz':
          handleHealthRequest(req, res);
          break;
        case '/ready':
        case '/readiness':
          handleReadinessRequest(req, res);
          break;
        case '/live':
        case '/liveness':
          handleLivenessRequest(req, res);
          break;
        default:
          // Default to health check
          handleHealthRequest(req, res);
      }
    });

    server.on('error', (error) => {
      reject(error);
    });

    server.listen(port, '0.0.0.0', () => {
      resolve({
        close: () => server.close(),
      });
    });
  });
}
