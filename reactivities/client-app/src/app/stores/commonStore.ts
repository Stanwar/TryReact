import { action, observable, reaction } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
    rootStore: RootStore;

    @observable token: string | null = window.localStorage.getItem('jwt');
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                }
                else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    @observable appLoaded = false;

    @action setToken = (token: string | null) => {
        window.localStorage.setItem("jwt", token!);
        this.token = token;
    };

    @action setAppLoaded = () => {
        this.appLoaded = true;
    };
}
