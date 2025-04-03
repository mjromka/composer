# Linkando Playbooks

**Linkando Playbooks** provides a comprehensive solution for the creation, management and support of digital playbooks for processes across diverse industries.

It is a monorepo managed with **pnpm**.

## Monorepo structure

The provided structure is not final and includes elements to be added in the future (marked with `~~`). For details about each component, refer to its respective README.md.

```
│── app/
│   ├── composer/
│   ├~~ extension/  # to be moved: Linkando browser extension
│   ├~~ sidebar/  # to be moved: CMS Sidebar
│   ├~~ web-play/  # to be moved: CMS Sidebar
│── packages/  # Elements shared between apps or integrated as libraries to existing solutions
│   ├── action-cards-builder/
│   ├~~ action-cards/  # to be moved: UI component for displaying an action card
│   ├── core/  # Shared types and functions
│   ├~~ meetings-builder/  # to be developed: # UI component for meeting objects building
│   ├~~ integrations-builder/  # to be developed: UI component for integrations management
```

## How to work with the monorepo

Pick an individual project and check its README.md for instructions and available scripts.

⚠️ use only `pnpm` as a package manager.
