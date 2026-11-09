// Hears the register form. The browser has already checked the fields by the time it submits.
import { getElement } from "../../shared/ui/dom";

const registerForm = getElement(".register-form", HTMLFormElement);

interface RegisterHandlers {
  onRegister: () => void;
}

// Called once from main.ts
export function bindRegisterEvents({ onRegister }: RegisterHandlers): void {
  registerForm.addEventListener("submit", (event) => {
    // There is no account server, so a real submit would land on a 404 page
    event.preventDefault();
    registerForm.reset();
    onRegister();
  });
}
