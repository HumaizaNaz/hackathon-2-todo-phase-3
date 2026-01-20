from dataclasses import dataclass

@dataclass
class Task:
    """Represents a single todo item."""
    id: int
    title: str
    description: str
    completed: bool = False
