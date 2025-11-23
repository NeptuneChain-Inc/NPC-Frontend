# Bluesignal Marketplace Dashboard

A React-based dashboard and marketplace frontend for managing environmental certificates, user accounts, and interactions with a blockchain + registry backend. The app handles user authentication, credit/certificate workflows, media, and data visualization, and is deployed via Firebase.

---

## Overview

This repository provides:

* **User Dashboards**
  Role-based dashboards (e.g., admins, operators, landowners, farmers) with tailored navigation, metrics, and controls.

* **Certificate / Credit Workflows**
  UI for submitting, reviewing, approving, and tracking certificates or credits backed by on-chain logic.

* **Registry Integration**
  Works alongside a separate backend/registry service that records certificates, ownership, and transaction history.

* **Authentication & Access Control**
  Email/password login, protected routes, and access control to prevent non-users from accessing internal app views.

* **Media & Streaming**
  Video/media upload and streaming integration (Livepeer), plus a “My Media” dashboard for user-generated content.

* **Mapping & Notifications**
  Geospatial/map-based UI elements and user notifications for status changes, errors, and critical actions.

---

## Tech Stack

* **Frontend:** React (SPA, `App.jsx`)
* **Runtime:** Node.js v20+
* **Hosting / Deployment:** Firebase Hosting
* **Auth & Data:** Firebase Authentication, Firebase Realtime Database
* **Media:** Livepeer (video upload/streaming)
* **Other:**

  * Notifications, modals, and confirmation prompts
  * Responsive layout (desktop + mobile)

---

## Prerequisites

* Node.js **v20+**
* `git` (authenticated to a collaborator account)
* Firebase CLI (`firebase`), logged into an account with access to the Firebase project

---

## Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bluesignal/Marketplace.git
   cd Marketplace
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Firebase login (for collaborators)**

   ```bash
   firebase login
   ```

   Make sure your Firebase account has been granted access to the project by an admin.

---

## Environment Variables

This project uses environment variables (e.g., Firebase configs, API keys).
Set them according to your existing Firebase / backend setup (typically in `.env` or via Firebase config).

Examples (names will match your existing project):

* Firebase API key & config values
* Backend / registry API base URL
* Media/streaming API key (Livepeer)

Check the project’s existing config files (`.env`, Firebase config, or documentation) for the exact variable names currently in use.

---

## Development

Start the development server:

```bash
npm run dev
```

(or the equivalent dev script your project uses; adjust to your existing `package.json`).

You’ll typically access the app at:

```text
http://localhost:3000
```

---

## Build & Deploy (Firebase)

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy via Firebase**

   ```bash
   firebase deploy
   ```

Deployment requires that:

* You are logged in with `firebase login`
* Your account has permission on the Firebase project

---

## Key Features (From Recent Iterations)

* **Registry + Marketplace Unified Codebase**

  * Combined dashboard + registry logic into a single app codebase
  * Shared UI and routing for credit/certificate workflows

* **UI/UX Enhancements**

  * Improved login, registration, and dashboard flows
  * Responsive design for sidebar, navbar, and layout
  * Notification bar and alerts for user actions

* **Account System & User Types**

  * Multiple account types with different dashboards
  * Dynamic dashboard content and sidebar links based on user type
  * Updated registration and login system with improved security

* **Dashboard & Metrics**

  * Role-specific metrics (e.g., “farmer dashboard”)
  * Chart components and test data generation for metrics
  * Database integration for dashboard data where implemented

* **Media & Streaming**

  * Livepeer integration for upload + streaming
  * “My Media” dashboard for user-created videos/streams
  * Bug fixes and performance improvements for media playback

* **Settings & Password Management**

  * Settings menu and modal-based configuration UI (partially implemented)
  * Password reset flow and bug fixes

* **Security & Access Control**

  * Protected routes to prevent unauthorized access
  * Improved handling of non-authenticated users

> Note: In areas where database integration is still in progress, cookies are used as a temporary mechanism for storing some state.

---

## Notes for Collaborators

* Ensure you have the correct Firebase project selected when running `firebase deploy`.
* If you see authentication or permission errors, verify your Firebase console access and environment configs.
* Old accounts or test data may become invalid when the account system changes; database resets are sometimes required after major auth or schema changes.

---

## Support

For collaborator access, environment configuration questions, or deployment help:
**[hi@bluesignal.xyz](mailto:hi@bluesignal.xyz)**

---
