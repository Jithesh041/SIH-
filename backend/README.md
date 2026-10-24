# Backend

FastAPI service backed by PostgreSQL, SQLAlchemy 2.x, and Alembic.

## Local setup

From this directory, create and activate a virtual environment, then install the
package and development dependencies:

```sh
python -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
```

Copy `.env.example` to `.env` and set `DATABASE_URL` for a running PostgreSQL
instance. Apply migrations and load the sample institutions with:

```sh
alembic upgrade head
python -m scripts.seed
```

Run the API with `uvicorn app.main:app --reload` and the schema checks with
`pytest`.

## Demo batch capacity

The over-intake fixture has 135 regular admission rows against Apex Institute's
sanctioned capacity of 120. From a clean baseline, the expected result is 120
accepted and 15 rejected with `CAP-001`. Accepted rows become active admission
records, so uploading the same fixture again after the first run correctly
starts above capacity and can reject all 135 rows. To replay the fixture, use
the Institute workspace's **Reset Demo Baseline** action, which calls
`POST /api/admin/reset-baseline`, then upload the fixture once.

Rows with another blocking validation error do not consume capacity. The batch
validator checks the capacity rule only for otherwise admissible rows, so an
invalid APAAR row cannot cause a later valid row to be rejected for a seat it
never occupied.
