💱 Currency Converter Web App

A modern, responsive currency converter web application that fetches real-time exchange rates using a public API. Built with clean UI, smooth UX, persistent settings, and thoughtful features that make currency conversion fast and intuitive.

🚀 Live Features Overview

This application allows users to:

Convert currencies using real-time exchange rates

Switch between light and dark themes

Swap currencies instantly

View conversion history

Save default currencies

Work gracefully in offline mode

Enjoy a smooth, mobile-friendly UI

🛠️ Tech Stack

HTML5 – Structure and layout

CSS3 – Styling, responsiveness, glassmorphism UI

JavaScript (ES6+) – Logic, API handling, state management

Frankfurter API – Real-time exchange rates

Flags API – Country flag rendering

LocalStorage – Persistent user data

🧑‍💻 How the App Works (User Flow)
1️⃣ First-Time Load

App opens in light theme

Default currencies are shown

No conversion or history is displayed initially

Clean and distraction-free UI

2️⃣ Currency Selection

Users select:

From currency

To currency

Flags update dynamically based on selection

Selected currencies are saved automatically

3️⃣ Amount Input

User enters the amount to convert

Conversion auto-triggers after a short delay (debounced)

Manual conversion is also available via button

4️⃣ Fetching Exchange Rates

App calls the Frankfurter API

Handles:

Loading state

Invalid currency pairs

Network failures gracefully

5️⃣ Conversion Output

Displays:

Current exchange rate

Converted amount (formatted)

Last updated date from API

🔁 Swap Currency Feature

One-click swap between From and To currencies

Flags, dropdowns, and stored values update instantly

Mobile vibration feedback for better UX

🌗 Theme Switching

Toggle between Light and Dark themes

Theme preference is saved in localStorage

Automatically applied on next visit

🕘 Conversion History

Stores last 10 manual conversions

Displays currency pair and converted amount

History persists using localStorage

Option to clear history anytime

⭐ Default Currency Setting

Users can save preferred From and To currencies

Automatically loaded on future visits

Reduces repetitive setup for frequent users

📡 Online / Offline Handling
Offline Mode:

Conversion button disabled

Displays offline message

Prevents API calls

Online Mode:

Automatically re-enables conversion

Notifies user when back online

⌨️ Keyboard & UI Interactions

Esc key closes:

About section

History panel

Click outside closes open panels

Clean interaction flow with minimal clutter

🧠 Smart UX Decisions

Debounced input prevents unnecessary API calls

Manual submit tracking avoids history spam

Button states reflect loading and network status

Clean error messages instead of silent failures

🔐 Data Persistence (localStorage)

The app stores:

Theme preference

Default currencies

Last selected currencies

Conversion history

This ensures a consistent experience across sessions.

⚠️ Error Handling

The app gracefully handles:

Invalid amounts

Same currency selection

API unavailability

Network issues

Offline state

No crashes, no blank screens.

📱 Responsive Design

Works smoothly on:

Mobile phones

Tablets

Desktop screens

Layout adapts using media queries

Mobile-first UX improvements included

📌 Future Enhancements (Planned)

Searchable currency dropdown

Historical rate charts

PWA support (installable app)

Multi-currency comparison

Export conversion history

👨‍💻 Author

Naman Jain
Frontend Developer | JavaScript Enthusiast

📜 License

This project is open-source and available for learning and personal use.
