from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Annotated, Any
from pydantic.functional_validators import BeforeValidator
from bson import ObjectId
import uuid
import asyncio
import requests
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Sindhuja & Pradeep Wedding")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Base helpers for Mongo ObjectId serialization ----------
def _coerce_objectid(v: Any) -> str:
    if isinstance(v, ObjectId):
        return str(v)
    return v


PyObjectId = Annotated[str, BeforeValidator(_coerce_objectid)]


# ---------- Models ----------
class RSVPCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    attending: bool = True
    guests: int = Field(default=1, ge=0, le=20)
    events: List[str] = Field(default_factory=list)  # e.g. ["wedding", "reception"]
    message: Optional[str] = Field(default="", max_length=600)


class RSVP(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    attending: bool = True
    guests: int = 1
    events: List[str] = Field(default_factory=list)
    message: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class WishCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    message: str = Field(..., min_length=1, max_length=600)


class Wish(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Sindhuja & Pradeep Wedding API"}


@api_router.get("/health")
async def health():
    """Lightweight health check used by the keep-alive cron. Returns 200 OK."""
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/rsvp", response_model=RSVP)
async def create_rsvp(payload: RSVPCreate):
    rsvp = RSVP(**payload.model_dump())
    doc = rsvp.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.rsvps.insert_one(doc)
    return rsvp


@api_router.get("/rsvp", response_model=List[RSVP])
async def list_rsvps():
    rows = await db.rsvps.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return rows


@api_router.get("/rsvp/stats")
async def rsvp_stats():
    rows = await db.rsvps.find({}, {"_id": 0, "attending": 1, "guests": 1}).to_list(2000)
    total_responses = len(rows)
    attending = [r for r in rows if r.get("attending")]
    total_guests = sum(int(r.get("guests", 0)) for r in attending)
    return {
        "total_responses": total_responses,
        "attending_count": len(attending),
        "not_attending_count": total_responses - len(attending),
        "total_guests": total_guests,
    }


@api_router.post("/wishes", response_model=Wish)
async def create_wish(payload: WishCreate):
    wish = Wish(**payload.model_dump())
    doc = wish.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.wishes.insert_one(doc)
    return wish


@api_router.get("/wishes", response_model=List[Wish])
async def list_wishes():
    rows = await db.wishes.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return rows


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def _ping_health():
    """Blocking GET to the health endpoint. Runs in a thread executor."""
    resp = requests.get(KEEPALIVE_URL, timeout=10)
    return resp.status_code

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
