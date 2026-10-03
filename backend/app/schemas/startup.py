from pydantic import BaseModel, Field
from typing import Optional, Literal

StartupStage = Literal[
    "Idea",
    "Validation",
    "Research",
    "Feasibility",
    "MVP",
    "Funding",
    "Launch",
]

StartupStatus = Literal["Active", "Draft", "Completed"]

class StartupContextSchema(BaseModel):
    startupName: Optional[str] = ""
    domain: Optional[str] = ""
    stage: Optional[str] = "Idea"
    description: Optional[str] = ""
    problem: Optional[str] = ""
    problemContext: Optional[str] = ""
    currentAlternatives: Optional[str] = ""
    proposedSolution: Optional[str] = ""
    keyValueProposition: Optional[str] = ""
    targetUsers: Optional[str] = ""
    primaryCustomer: Optional[str] = ""
    targetGeography: Optional[str] = ""
    businessModel: Optional[str] = ""
    revenueModel: Optional[str] = ""
    technologyDescription: Optional[str] = ""
    technologyRequirements: Optional[str] = ""
    shortTermGoals: Optional[str] = ""
    longTermGoals: Optional[str] = ""
    assumptions: Optional[str] = ""
    constraints: Optional[str] = ""

class StartupCreate(BaseModel):
    name: str = Field(..., min_length=2)
    problem: str = Field(..., min_length=5)
    solution: str = Field(..., min_length=5)
    targetUsers: str = Field(..., min_length=2)
    domain: str = Field(..., min_length=2)
    stage: StartupStage = "Idea"
    description: Optional[str] = ""

class StartupUpdate(BaseModel):
    name: Optional[str] = None
    problem: Optional[str] = None
    solution: Optional[str] = None
    targetUsers: Optional[str] = None
    domain: Optional[str] = None
    stage: Optional[StartupStage] = None
    description: Optional[str] = None
    status: Optional[StartupStatus] = None
    context: Optional[StartupContextSchema] = None

class StartupResponse(BaseModel):
    id: str
    userId: str
    name: str
    problem: str
    solution: str
    targetUsers: str
    domain: str
    stage: StartupStage
    description: Optional[str] = ""
    status: StartupStatus = "Active"
    context: StartupContextSchema
    createdAt: str
    updatedAt: str
