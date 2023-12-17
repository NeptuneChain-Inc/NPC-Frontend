# NeptuneChain Dashboard - NPRC-Marketplace Repository

## Repository Description
The NPRC-Marketplace repository serves as the core platform for the NeptuneChain Dashboard. It is specifically designed to facilitate user dashboards and certificate transactions within NeptuneChain's ecosystem. This repository focuses on features such as credit verification, marketplace integration, and user interaction with the blockchain backend. It works in tandem with a separate registry repository, which records these transactions.

## Changelog Overview

### Latest Update (November 6)
**Credit Verification and Marketplace Integration:**
- Integration with blockchain backend.
- Development of Smart Contracts for Verification & Marketplace.
- Addition of Marketplace UI routing.
- Integrated User control for functions like submission, approval, etc.

### October 29 - Polishing
- Enhanced UX (Login, Registration, Dashboard).
- Settings Menu Enhancements.
- Media Upload enhancements.
- Rendering & Performance Enhancements.
- Added Reset Password feature.
- Dash UI Responsiveness Enhancements.

### October 15 - Minor Changes
- Adding Code Documentation (Comments).
- (Farmer Dashboard) Enhance Metric Components * (Ongoing Implementation).
- Integrated/Optimized Chart Components.
- (Farmer Dashboard) Setup Data generation testing algorithm * (Ongoing Implementation).
- (Farmer Dashboard) Database integration for data retrieval/updates * (Ongoing Implementation).

### October 8 - Major Changes
- Reworked account system for different account types.
- System to load dashboard content and settings based on user types.
- Structured templates for different user dashboards.
- Updated Registration and login system.
- Updated User management and local storage.
- Migrated Dashboard data to databases for dynamic rendering.
- Added new database functions for user dashboards.
- Enhanced App Security (non-users revoked access to app routes).
- Integrated search algorithm for dashboard content.
- Updated the Sidebar component to indicate user type and dynamically render dash links.
- Populated the Settings Menu Tabs with modal settings (Not Yet Implemented).

*NB: Due to the change in account systems, old user accounts will not work. (Preferred Action: Database reset).

### October 1 - Major Changes
- UI Enhancements (Navbar, Sidebar, Mobile Responsiveness, layout, etc).
- Added Settings Menu (Still Needs To Be Implemented).
- Livepeer bug fixes.
- Livepeer Media and Stream Player Enhancements.
- Added 'My Media' Dashboard for user-created videos and streams.

### September 24 - Major Changes
- Livepeer Integration - Video Upload/Streaming.
- Database Integration - Userdata/Asset Data.

### September 20 - Major Changes
- Added Notification Bar.

### September 10 - Major Changes
- Added Welcome Page, Register Page, and Log in Page.
- Firebase Email/Password Authentication Implementation.
- Error/Alert/Notification Handling.
- Added a confirmation popup for critical functions.
- General User Experience Enhancements.

## Notes
- Clicking on the NeptuneChain logo from any page opens the welcome screen.
- Where a database is not yet implemented, cookies are used.
