import { writable } from "svelte/store";

export let isLoggedIn = writable(false);

export let isModalLoginOpened = writable(false);

export let isModalDesireOpened = writable(false);

export let currentUser = writable(false);

export let isSuccessModalOpened = writable(false);
