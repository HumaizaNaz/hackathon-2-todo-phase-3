# Data Model: Phase 3 AI Chatbot

## Entity Definitions

### Task Entity
**Description**: Represents a user's task with attributes for user identification, title, description, completion status, and timestamps

**Fields**:
- `id` (UUID/Integer): Primary key, unique identifier for the task
- `user_id` (String/UUID): Foreign key linking to the user who owns the task
- `title` (String, max 255): Title of the task
- `description` (Text, optional): Detailed description of the task
- `completed` (Boolean): Whether the task is completed (default: false)
- `created_at` (DateTime): Timestamp when the task was created
- `updated_at` (DateTime): Timestamp when the task was last updated

**Validation Rules**:
- `title` is required and must be 1-255 characters
- `user_id` must reference a valid user
- `completed` defaults to false
- `created_at` is set automatically on creation
- `updated_at` is updated automatically on modification

### Conversation Entity
**Description**: Represents a chat session between user and AI assistant with timestamps

**Fields**:
- `id` (UUID/Integer): Primary key, unique identifier for the conversation
- `user_id` (String/UUID): Foreign key linking to the user who owns the conversation
- `created_at` (DateTime): Timestamp when the conversation was started
- `updated_at` (DateTime): Timestamp when the conversation was last updated

**Validation Rules**:
- `user_id` must reference a valid user
- `created_at` is set automatically on creation
- `updated_at` is updated automatically on modification

### Message Entity
**Description**: Represents individual messages within a conversation with role (user/assistant), content, and timestamp

**Fields**:
- `id` (UUID/Integer): Primary key, unique identifier for the message
- `user_id` (String/UUID): Foreign key linking to the user who sent the message
- `conversation_id` (String/UUID): Foreign key linking to the conversation this message belongs to
- `role` (String): Role of the message sender ('user' or 'assistant')
- `content` (Text): Content of the message
- `created_at` (DateTime): Timestamp when the message was created

**Validation Rules**:
- `user_id` must reference a valid user
- `conversation_id` must reference a valid conversation
- `role` must be either 'user' or 'assistant'
- `content` is required and must be 1-10000 characters
- `created_at` is set automatically on creation

## Relationships

- One `User` has many `Task`s
- One `User` has many `Conversation`s
- One `User` has many `Message`s
- One `Conversation` has many `Message`s
- One `Message` belongs to one `Conversation`

## Indexes

- `Task.user_id`: Index for efficient retrieval of user's tasks
- `Conversation.user_id`: Index for efficient retrieval of user's conversations
- `Message.conversation_id`: Index for efficient retrieval of messages in a conversation
- `Message.created_at`: Index for chronological ordering of messages
- `Task.completed`: Index for filtering completed/incomplete tasks

## State Transitions

### Task State Transitions
- `incomplete` → `completed`: When user marks task as done via `complete_task_skill`
- `completed` → `incomplete`: When user unmarks task as done via `update_task_skill`

## Constraints

- Referential integrity: All foreign keys must reference existing records
- Data consistency: `updated_at` fields must be >= `created_at` fields
- User isolation: Users can only access their own tasks, conversations, and messages