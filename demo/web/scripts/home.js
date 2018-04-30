// Updating local plan only once
if (!isSessionCreated()) {
    createSession();
    updateLocalPlan();
}