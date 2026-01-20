# Data Model for Todo Console App

This document outlines the data model for the entities used in the Todo Console App.

## Task

Represents a single todo item.

| Attribute | Type | Description | Constraints |
|---|---|---|---|
| `id` | integer | A unique identifier for the task. | Required, auto-incrementing, unique. |
| `title` | string | A short, descriptive string for the task. | Required, non-empty. |
| `description` | string | An optional longer string providing more details. | Optional. |
| `status` | boolean | Indicates whether the task is complete. | Required, defaults to `False` (incomplete). |
