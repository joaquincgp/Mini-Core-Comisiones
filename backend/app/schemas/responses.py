from pydantic import BaseModel
from typing import List, Optional, Any

class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    error_code: Optional[str] = None