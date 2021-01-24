
import { writable } from 'svelte/store';

export const alert = writable({isActive: false, msg: '', isError: false});

export function setAlert(msg, isError) {
    alert.set({isActive: true, msg, isError});
}

export function disableAlert() {
    alert.set({isActive: false, msg: '', isError: false});
}