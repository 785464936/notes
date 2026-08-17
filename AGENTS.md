---
type: Config
tags:
  - okf-exempt
status: stable
---

# AGENTS.md - Repository Guidelines for Notes Repository

## Repository Overview
This is a personal notes repository organized using Obsidian.md. It contains academic notes, course materials, and personal documentation primarily in Markdown format. There is no traditional software codebase, build system, or test framework.

## File Structure
- **Root directory**: Contains main note files (.md) organized by subject/topic
- **`01-Projects/`**: Project index notes (考研, 复习, 英语, AI)
- **`02-Journal/`**: Daily and weekly journal entries
- **`03-Templates/`**: Note templates for consistent formatting
- **`.opencode/`**: opencode agent configuration
  - `skills/update-index-log/`: index.md/log.md maintenance skill
- **`assets/`**: Supporting files (images, documents, etc.)
  - `fig/`: Figures and diagrams
  - `IloveEnglish/`: English learning assets
- **`Excalidraw/`**: Excalidraw diagram files

## Build/Lint/Test Commands
**Note**: This repository does not contain executable code, so there are no traditional build, lint, or test commands.

### Markdown Validation
- No formal linting setup exists
- Ensure proper Markdown syntax when editing notes
- Use Obsidian's built-in preview to verify formatting

### Testing Approach
- Since this contains notes/documentation only, "testing" consists of:
  - Verifying Markdown renders correctly in Obsidian
  - Ensuring links between notes work properly
  - Checking that embedded content (images, tables, etc.) displays correctly

### Running Specific Operations
- **No test runner available** - this is a documentation repository
- **No build system** - files are static Markdown
- **No single test execution** - not applicable to notes repository

## Code Style Guidelines
While this repository primarily contains notes rather than code, these guidelines apply to any code snippets or technical content:

### General Formatting
- **Line Length**: Keep lines under 80 characters when possible for readability
- **Indentation**: Use 2 spaces for consistency
- **File Encoding**: UTF-8
- **Line Endings**: LF (Unix-style)

### Markdown Style
- **Headers**: Use `#` syntax consistently (`# H1`, `## H2`, etc.)
- **Lists**: Use `-` for unordered lists, numbers for ordered lists
- **Links**: Use `[text](link)` format for internal and external links
- **Code Blocks**: Use triple backticks with language specification:
  ```python
  # Python code
  print("Hello World")
  ```
- **Tables**: Align columns properly for readability
- **Emphasis**: Use `**bold**` and `*italic*` consistently

### Code Snippets (when included)
- **Language Specification**: Always specify language in code blocks
- **Consistency**: Maintain consistent style within the same note
- **Comments**: Include brief explanations for complex code snippets
- **Security**: Never include sensitive information, credentials, or API keys

### Naming Conventions
- **File Names**: Use descriptive, kebab-case names (e.g., `machine-vision-notes.md`)
- **Internal Links**: Use consistent naming for cross-references
- **Tags**: Use consistent tag naming (e.g., `#subject/topic/subtopic`)

### Error Handling
- **Link Validation**: Ensure all internal links point to existing files
- **Image References**: Verify all image paths are correct
- **Code Accuracy**: Ensure code snippets are syntactically correct and functional
- **Content Verification**: Cross-check technical information for accuracy

## Obsidian-Specific Guidelines
- **Dataview Queries**: Use consistent formatting for Dataview queries
- **Templates**: Follow established templates in the `Templates/` directory
- **Backlinks**: Utilize Obsidian's backlinking feature for related content
- **Tags**: Use hierarchical tagging system (`#course/subject/topic`)

### Frontmatter Key Order (OKF v0.2)
All note frontmatter keys follow this fixed order; skip lines for keys not present:

1. `excalidraw-plugin` - Excalidraw diagrams only
2. `cssclasses`        - CSS classes
3. `source_url`        - Source URL
4. `author`            - Author
5. `created`           - Creation date
6. `project`           - Goal axis
7. `type`              - Form axis: MOC/Note/Exam/Journal/Dashboard/Template/Diagram/Course/Flashcard/Config
8. `tags`              - Subject axis
9. `week`              - Belonging week (journal)
10. `year`             - Exam year
11. `..`               - Parent note (breadcrumb)
12. `status`           - Lifecycle: draft | stable | deprecated (缺省=stable)
13. `stale_after`      - 有效期 (YYYY-MM-DD)；today >= stale_after 视为过期
14. `isArchived`       - Archived flag (boolean)

Rules:
- Skip any key not present; keep order fixed.
- `status` 三值语义：draft=未审阅/可能不完整；stable=默认/可消费；deprecated=保留链接与历史/不再有效。缺省视为 stable。
- **OKF exemption**: files tagged `okf-exempt` are excluded from OKF compliance checks and the root `index.md`. This file (AGENTS.md) is itself exempt.

## Plugin Considerations
The repository uses several Obsidian plugins:
- **Dataview**: For dynamic content generation
- **Templater**: For note templates
- **Excalidraw**: For diagrams and visual notes
- **Various utility plugins**: For enhanced editing experience

When adding content that interacts with these plugins, ensure compatibility and proper syntax.

## Content Organization
- **Academic Notes**: Organized by course/subject
- **Technical Documentation**: Grouped by technology/topic
- **Personal Notes**: Categorized appropriately
- **Cross-references**: Use Obsidian's linking system extensively

## Quality Standards
- **Accuracy**: Verify all technical information before committing
- **Clarity**: Write clearly and concisely
- **Consistency**: Maintain consistent formatting across all notes
- **Completeness**: Ensure notes are sufficiently detailed for future reference

## Version Control Best Practices
- **Commit Messages**: Use descriptive commit messages
- **Atomic Commits**: Make focused changes per commit
- **Branching**: Not typically needed for personal notes, but use feature branches for major reorganizations
- **Pull Requests**: Not applicable for personal repository

## Security Considerations
- **No Sensitive Data**: Never commit credentials, API keys, or personal identifiable information
- **Public Repository**: Assume all content may become public
- **External Links**: Verify links don't lead to malicious content

## Maintenance Guidelines
- **Regular Reviews**: Periodically review and update outdated information
- **Broken Link Checks**: Use Obsidian's broken link indicator
- **File Cleanup**: Remove unused or duplicate files
- **Backup Strategy**: Ensure regular backups of the vault

## Special Instructions for AI Agents
- **Always Reply in Chinese**: All responses and communications must be in Chinese
- **Preserve Structure**: Maintain existing file organization and naming conventions
- **Respect Templates**: Use existing templates when creating new notes
- **Markdown Only**: Do not introduce non-Markdown formats unless specifically requested
- **Academic Integrity**: Ensure all content represents original work or properly cited sources
- **Context Awareness**: Understand this is a learning/personal knowledge repository, not a production codebase

## When Adding New Content
1. Check if a similar note already exists
2. Use appropriate templates from the `Templates/` directory
3. Apply consistent tagging and linking
4. Verify all technical information for accuracy
5. Ensure proper Markdown formatting
6. Test rendering in Obsidian preview

## Cursor/Copilot Rules
- No Cursor rules (`.cursor/`) and no Copilot instructions (`.github/`) exist in this repository.
- Default to general Markdown and academic note-taking best practices.

This repository serves as a personal knowledge base and learning resource. All modifications should enhance clarity, accuracy, and organization while maintaining the existing structure and conventions.