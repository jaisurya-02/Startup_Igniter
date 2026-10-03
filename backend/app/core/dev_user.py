from fastapi import Header, HTTPException, status
from typing import Optional

"""
TEMPORARY DEVELOPMENT USER MECHANISM (PHASE 6)

Will be replaced with JWT authentication middleware in Phase 7/backend auth phase.
Extracts user ID from optional Authorization bearer token or defaults to central dev user.
"""
DEFAULT_DEV_USER_ID = "dev_user_123"

def get_current_user_id(authorization: Optional[str] = Header(None)) -> str:
    if authorization and authorization.startswith("Bearer dev_token_"):
        extracted_id = authorization.replace("Bearer dev_token_", "").strip()
        if extracted_id:
            return extracted_id
    return DEFAULT_DEV_USER_ID
