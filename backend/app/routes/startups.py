from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.schemas.startup import (
    StartupCreate,
    StartupUpdate,
    StartupResponse,
    StartupContextSchema,
)
from app.services.startup_service import StartupService
from app.core.dev_user import get_current_user_id

router = APIRouter(prefix="/api/startups", tags=["startups"])

@router.post("", response_model=StartupResponse, status_code=status.HTTP_201_CREATED)
def create_startup(
    payload: StartupCreate,
    user_id: str = Depends(get_current_user_id),
):
    try:
        startup = StartupService.create_startup(user_id, payload)
        return startup
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create venture: {str(e)}",
        )

@router.get("", response_model=List[StartupResponse])
def get_user_startups(
    user_id: str = Depends(get_current_user_id),
):
    try:
        return StartupService.get_user_startups(user_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch user ventures: {str(e)}",
        )

@router.get("/{startup_id}", response_model=StartupResponse)
def get_startup(
    startup_id: str,
    user_id: str = Depends(get_current_user_id),
):
    startup = StartupService.get_startup(startup_id, user_id)
    if not startup:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Startup venture not found or unauthorized.",
        )
    return startup

@router.put("/{startup_id}", response_model=StartupResponse)
def update_startup(
    startup_id: str,
    payload: StartupUpdate,
    user_id: str = Depends(get_current_user_id),
):
    updated = StartupService.update_startup(startup_id, user_id, payload)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Startup venture not found or unauthorized.",
        )
    return updated

@router.delete("/{startup_id}", status_code=status.HTTP_200_OK)
def delete_startup(
    startup_id: str,
    user_id: str = Depends(get_current_user_id),
):
    success = StartupService.delete_startup(startup_id, user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Startup venture not found or unauthorized.",
        )
    return {"message": "Startup deleted successfully."}

@router.get("/{startup_id}/context", response_model=StartupContextSchema)
def get_startup_context(
    startup_id: str,
    user_id: str = Depends(get_current_user_id),
):
    startup = StartupService.get_startup(startup_id, user_id)
    if not startup:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Startup venture not found or unauthorized.",
        )
    return startup.get("context", {})

@router.put("/{startup_id}/context", response_model=StartupResponse)
def update_startup_context(
    startup_id: str,
    payload: StartupContextSchema,
    user_id: str = Depends(get_current_user_id),
):
    updated = StartupService.update_startup_context(startup_id, user_id, payload)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Startup venture not found or unauthorized.",
        )
    return updated
