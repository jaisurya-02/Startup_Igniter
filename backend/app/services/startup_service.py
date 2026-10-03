import time
import uuid
from datetime import datetime
from typing import Optional, List, Dict, Any
from app.core.database import get_startups_collection
from app.schemas.startup import StartupCreate, StartupUpdate, StartupContextSchema

def _serialize_startup(doc: Dict[str, Any]) -> Dict[str, Any]:
    if not doc:
        return None
    # Remove MongoDB internal _id if present
    if "_id" in doc:
        del doc["_id"]
    return doc

class StartupService:
    @staticmethod
    def create_startup(user_id: str, data: StartupCreate) -> Dict[str, Any]:
        coll = get_startups_collection()
        startup_id = f"vtr_{int(time.time()*1000)}_{uuid.uuid4().hex[:6]}"
        now = datetime.utcnow().isoformat()

        initial_context = {
            "startupName": data.name.strip(),
            "domain": data.domain.strip(),
            "stage": data.stage,
            "description": (data.description or "").strip(),
            "problem": data.problem.strip(),
            "problemContext": "",
            "currentAlternatives": "",
            "proposedSolution": data.solution.strip(),
            "keyValueProposition": "",
            "targetUsers": data.targetUsers.strip(),
            "primaryCustomer": "",
            "targetGeography": "",
            "businessModel": "",
            "revenueModel": "",
            "technologyDescription": "",
            "technologyRequirements": "",
            "shortTermGoals": "",
            "longTermGoals": "",
            "assumptions": "",
            "constraints": "",
        }

        doc = {
            "id": startup_id,
            "userId": user_id,
            "name": data.name.strip(),
            "problem": data.problem.strip(),
            "solution": data.solution.strip(),
            "targetUsers": data.targetUsers.strip(),
            "domain": data.domain.strip(),
            "stage": data.stage,
            "description": (data.description or "").strip(),
            "status": "Active",
            "context": initial_context,
            "createdAt": now,
            "updatedAt": now,
        }

        coll.insert_one(doc)
        return _serialize_startup(doc)

    @staticmethod
    def get_user_startups(user_id: str) -> List[Dict[str, Any]]:
        coll = get_startups_collection()
        docs = list(coll.find({"userId": user_id}))
        return [_serialize_startup(d) for d in docs]

    @staticmethod
    def get_startup(startup_id: str, user_id: str) -> Optional[Dict[str, Any]]:
        coll = get_startups_collection()
        doc = coll.find_one({"id": startup_id, "userId": user_id})
        return _serialize_startup(doc)

    @staticmethod
    def update_startup(startup_id: str, user_id: str, data: StartupUpdate) -> Optional[Dict[str, Any]]:
        coll = get_startups_collection()
        doc = coll.find_one({"id": startup_id, "userId": user_id})
        if not doc:
            return None

        now = datetime.utcnow().isoformat()
        updates: Dict[str, Any] = {"updatedAt": now}

        if data.name is not None:
            updates["name"] = data.name.strip()
        if data.problem is not None:
            updates["problem"] = data.problem.strip()
        if data.solution is not None:
            updates["solution"] = data.solution.strip()
        if data.targetUsers is not None:
            updates["targetUsers"] = data.targetUsers.strip()
        if data.domain is not None:
            updates["domain"] = data.domain.strip()
        if data.stage is not None:
            updates["stage"] = data.stage
        if data.description is not None:
            updates["description"] = data.description.strip()
        if data.status is not None:
            updates["status"] = data.status

        # Synchronize context fields if basic info updated
        existing_ctx = doc.get("context", {})
        if "name" in updates:
            existing_ctx["startupName"] = updates["name"]
        if "domain" in updates:
            existing_ctx["domain"] = updates["domain"]
        if "stage" in updates:
            existing_ctx["stage"] = updates["stage"]
        if "problem" in updates:
            existing_ctx["problem"] = updates["problem"]
        if "solution" in updates:
            existing_ctx["proposedSolution"] = updates["solution"]
        if "targetUsers" in updates:
            existing_ctx["targetUsers"] = updates["targetUsers"]
        if "description" in updates:
            existing_ctx["description"] = updates["description"]

        if data.context is not None:
            ctx_dict = data.context.model_dump(exclude_unset=True)
            existing_ctx.update(ctx_dict)

        updates["context"] = existing_ctx

        coll.update_one({"id": startup_id, "userId": user_id}, {"$set": updates})
        updated_doc = coll.find_one({"id": startup_id, "userId": user_id})
        return _serialize_startup(updated_doc)

    @staticmethod
    def update_startup_context(startup_id: str, user_id: str, context_data: StartupContextSchema) -> Optional[Dict[str, Any]]:
        coll = get_startups_collection()
        doc = coll.find_one({"id": startup_id, "userId": user_id})
        if not doc:
            return None

        now = datetime.utcnow().isoformat()
        existing_ctx = doc.get("context", {})
        ctx_updates = context_data.model_dump(exclude_unset=True)
        existing_ctx.update(ctx_updates)

        # Sync key fields back to startup metadata
        updates: Dict[str, Any] = {
            "context": existing_ctx,
            "updatedAt": now
        }

        if "startupName" in ctx_updates and ctx_updates["startupName"]:
            updates["name"] = ctx_updates["startupName"]
        if "domain" in ctx_updates and ctx_updates["domain"]:
            updates["domain"] = ctx_updates["domain"]
        if "stage" in ctx_updates and ctx_updates["stage"]:
            updates["stage"] = ctx_updates["stage"]
        if "problem" in ctx_updates and ctx_updates["problem"]:
            updates["problem"] = ctx_updates["problem"]
        if "proposedSolution" in ctx_updates and ctx_updates["proposedSolution"]:
            updates["solution"] = ctx_updates["proposedSolution"]
        if "targetUsers" in ctx_updates and ctx_updates["targetUsers"]:
            updates["targetUsers"] = ctx_updates["targetUsers"]
        if "description" in ctx_updates and ctx_updates["description"]:
            updates["description"] = ctx_updates["description"]

        coll.update_one({"id": startup_id, "userId": user_id}, {"$set": updates})
        updated_doc = coll.find_one({"id": startup_id, "userId": user_id})
        return _serialize_startup(updated_doc)

    @staticmethod
    def delete_startup(startup_id: str, user_id: str) -> bool:
        coll = get_startups_collection()
        res = coll.delete_one({"id": startup_id, "userId": user_id})
        return res.deleted_count > 0
