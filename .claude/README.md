# Claude Code Configuration for Todo App Frontend

This directory contains Claude Code agents and reusable skills for managing the frontend UI of the Todo application.

## Overview

The configuration includes:

- **Frontend UI Agent**: An intelligent agent for managing UI components and styling
- **Reusable Skills**: Predefined operations for common UI tasks
- **Cloud-Native Blueprints**: Reusable patterns for consistent development

## Agents

### Frontend UI Agent

The `frontend-ui-agent` manages UI components and ensures consistency across the application.

**Configuration**: `.cloude/frontend-ui-agent.yaml`

## Available Skills

### 1. UI Enhancements Skill
**File**: `.cloude/skills/ui-enhancements.skill`

Enhances existing UI components with improved styling, responsiveness, and accessibility.

**Parameters**:
- `component_name`: Name of the component to enhance (required)
- `styling_options`: Styling options to apply (optional)
- `responsive_features`: Whether to include responsive features (optional, default: true)

**Usage Example**:
```bash
# Enhance a specific component
claude-code run ui-enhancements --component_name "TodoItem" --styling_options.classes="neon-themed"
```

### 2. Theme Management Skill
**File**: `.cloude/skills/theme-management.skill`

Manages and applies themes consistently across the application.

**Parameters**:
- `theme_type`: Type of theme to apply (neon, dark, light, custom) (required)
- `theme_variables`: Custom theme variables to apply (optional)
- `components`: Components to apply theme to (optional, default: ["all"])

**Usage Example**:
```bash
# Apply neon theme to all components
claude-code run theme-management --theme_type "neon"

# Apply custom theme variables to specific components
claude-code run theme-management --theme_type "custom" --theme_variables.colors.primary="#00ffff" --components "['TodoList', 'Navbar']"
```

### 3. Responsive Design Skill
**File**: `.cloude/skills/responsive-design.skill`

Implements responsive design patterns for components.

**Parameters**:
- `target_component`: Component to make responsive (required)
- `breakpoints`: Breakpoints to implement (optional, default: ["sm", "md", "lg", "xl"])
- `layout_type`: Type of responsive layout (grid, flex, stack) (optional, default: "grid")

**Usage Example**:
```bash
# Make a component responsive
claude-code run responsive-design --target_component "TodoList" --breakpoints '["sm", "md", "lg"]'
```

### 4. Component Creation Skill
**File**: `.cloude/skills/component-creation.skill`

Creates new React components with proper structure and best practices.

**Parameters**:
- `component_name`: Name of the component to create (required)
- `component_type`: Type of component (functional, class, hoc, hook) (optional, default: "functional")
- `styling_type`: Styling approach (tailwind, css_modules, styled_components, none) (optional, default: "tailwind")
- `with_tests`: Whether to create test files (optional, default: true)
- `with_stories`: Whether to create storybook stories (optional, default: false)

**Usage Example**:
```bash
# Create a new component with tests
claude-code run component-creation --component_name "TodoStats" --with_tests true

# Create a component with Storybook stories
claude-code run component-creation --component_name "TaskCard" --with_stories true
```

## Configuration

The main configuration is in `.cloude/claude-config.yaml`, which defines:

- Registered agents and skills
- Project-specific settings
- Technology stack
- Coding standards
- Hooks and automation
- Global parameters

## Reusable Intelligence Patterns

The configuration implements several reusable patterns:

- **Neon Theme Pattern**: Consistent application of neon theme colors
- **Responsive Grid Pattern**: Mobile-first responsive grid layouts
- **Accessible UI Pattern**: Accessibility-compliant UI components

## Getting Started

1. Ensure Claude Code is installed and configured
2. Navigate to the project root directory
3. Use any of the skills as shown in the examples above

## Best Practices

- Use consistent naming conventions for components
- Follow the mobile-first approach for responsive design
- Maintain accessibility standards in all components
- Apply themes consistently using the theme management skill
- Create components using the component creation skill for consistency