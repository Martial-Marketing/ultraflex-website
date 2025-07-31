import route from 'ziggy-js';
import { Ziggy } from '../ziggy';  // Adjust if your ziggy.js is in a different location

export default function useRoute(name, params = {}, absolute = false) {
    return route(name, params, absolute, Ziggy);
}
