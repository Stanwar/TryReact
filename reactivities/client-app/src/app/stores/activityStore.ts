import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../Models/activity";

configure({ enforceActions: "always" });
class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';
    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }
    // Actions
    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction("loadingActivities", () => {
                activities.forEach((activity) => {
                    activity.date = activity.date.split(".")[0];
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction("loadingActivitiesError", () => {
                this.loadingInitial = false;
            });
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
        }
        else{
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction("load activity", () => {
                    this.activity = activity;
                    this.loadingInitial = false;
                });
            }
            catch(error){
                runInAction("load activity error", () => {
                    this.loadingInitial = false;
                });
                console.log(console.error);
                
            }
        }
    }

    @action clearActivity = () => {
        this.activity = null;
    }
    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction("creatingActivities", () => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
            });
        } catch (error) {
            runInAction("creatingActivitiesError", () => {
                this.submitting = false;
            });
        }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction("editActivities", () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.editMode = false;
            });
        } catch (error) {
            runInAction("editActivitiesError", () => {
                this.editMode = false;
            });
        }
    };

    @action deleteActivity = async (
        event: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction("deleteActivities", () => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = "";
            });
        } catch (error) {
            console.log(error);
            runInAction("deleteActivitiesError", () => {
                this.submitting = false;
                this.target = "";
            });
        }
    };

    @action openCreateForm = () => {
        this.editMode = true;
        this.activity = null;
    };

    @action openEditForm = (id: String) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    @action selectActivity = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = false;
    };

    @action cancelSelectedActivity = () => {
        this.activity = null;
    };

    @action cancelFormOpen = () => {
        this.editMode = false;
    };
}

export default createContext(new ActivityStore());
