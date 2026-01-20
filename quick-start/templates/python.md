# Python CLAUDE.md Template

Optimized for Python projects.

---

```markdown
# Project Name

[Brief description]

## Tech Stack

- Python 3.11+
- Framework: [FastAPI / Django / Flask]
- Database: [PostgreSQL / SQLite / MongoDB]
- ORM: [SQLAlchemy / Django ORM / Prisma]
- Testing: pytest
- Packaging: [Poetry / pip / uv]

## Project Structure

```
project/
├── src/
│   └── project_name/
│       ├── __init__.py
│       ├── main.py           # Entry point
│       ├── config.py         # Configuration
│       ├── models/           # Data models
│       ├── routes/           # API routes (if applicable)
│       ├── services/         # Business logic
│       └── utils/            # Utilities
├── tests/
│   ├── conftest.py           # pytest fixtures
│   ├── test_models.py
│   └── test_services.py
├── pyproject.toml            # Project configuration
├── requirements.txt          # Dependencies (if not using Poetry)
└── .env                      # Environment variables
```

## Conventions

### Code Style
- Follow PEP 8
- Use type hints for function signatures
- Docstrings for public functions (Google style)
- Format with Black, lint with Ruff

### Naming
- Modules: snake_case
- Classes: PascalCase
- Functions/variables: snake_case
- Constants: UPPER_SNAKE_CASE

### Imports
```python
# Standard library
import os
from typing import Optional

# Third-party
from fastapi import FastAPI
from pydantic import BaseModel

# Local
from project_name.models import User
from project_name.services import UserService
```

## Commands

### Development
```bash
# Using Poetry
poetry run uvicorn src.project_name.main:app --reload

# Using pip
python -m uvicorn src.project_name.main:app --reload
```

### Testing
```bash
# Run all tests
pytest

# With coverage
pytest --cov=src

# Single file
pytest tests/test_models.py -v
```

### Dependencies
```bash
# Poetry
poetry add package_name
poetry install

# pip
pip install package_name
pip freeze > requirements.txt
```

### Formatting
```bash
black src tests
ruff check src tests --fix
```

## Patterns

### Dependency Injection (FastAPI)
```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users")
async def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()
```

### Configuration
```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str

    class Config:
        env_file = ".env"

settings = Settings()
```

### Error Handling
```python
from fastapi import HTTPException

if not user:
    raise HTTPException(status_code=404, detail="User not found")
```

## Don'ts

- Don't use mutable default arguments
- Don't catch bare exceptions (except Exception)
- Don't ignore type hints on public functions
- Don't commit .env files
- Don't use print() for logging (use logging module)

## Environment Variables

```
DATABASE_URL=postgresql://user:pass@localhost/db
SECRET_KEY=your-secret-key
DEBUG=true
```

## Notes

[Project-specific notes]
```

---

## Framework Variations

### Django
Add:
```markdown
## Django Specific
- Settings in config/settings/
- Apps in apps/ directory
- Management commands: python manage.py [command]
```

### Flask
Add:
```markdown
## Flask Specific
- Application factory pattern in __init__.py
- Blueprints for route organization
- Flask-SQLAlchemy for ORM
```
