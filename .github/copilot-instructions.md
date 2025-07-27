## Project Overview

This project is a configurable, themeable, and easily customizable chat widget designed for integration with LLMs (Large Language Models). The widget is intended to be embedded into any website and supports flexible configuration for appearance, LLM provider, and UI content.

### Folder Structure

- **dev-host/**: Contains a basic website for local testing. The generated scripts are embedded here to simulate real-world usage.
- **main-script/**: Contains JavaScript code responsible for injecting an iframe into the host website. This script acts as the bridge between the host page and the chat widget.
- **react-app/**: Contains the React application that is loaded inside the injected iframe. This is the actual chat widget UI.

### Communication

The `main-script` and `react-app` communicate via browser events, enabling two-way messaging and configuration.

## Configuration Goals

The widget is designed to be highly configurable. Planned and current configuration options include:

- **Theme**: Customizable via Mantine theme options.
- **LLM Provider**: Selectable via an adapter pattern, allowing support for different LLM backends.
- **Icons & Text**: UI elements such as icons and text should be easily replaceable via config.
- **Screens**: The widget may support multiple screens, such as:
  - Home (with configurable links and cards)
  - Chat
  - Chats List

## Development Notes

- The project is not yet complete. Expect ongoing changes to configuration, communication, and UI structure.
- When contributing, keep extensibility and customizability in mind.
- All communication between the host and the widget should use events for decoupling.
- Theming and LLM provider logic should be abstracted for easy swapping.

## Contribution Guidelines

- Keep code modular and well-documented.
- Prefer configuration-driven approaches for UI and logic.
- Ensure that new features are easily testable in the `dev-host` environment.
- Follow best practices for React and modern JavaScript/TypeScript development.
