import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container, Header, Icon, List, Menu } from "semantic-ui-react";
import "./styles.css";
import { IActivity } from "../Models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
        null
    );

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState("");

    const handleCreateActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.create(activity).then(() => {
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false));
    };

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.filter((f) => f.id === id)[0]);
        setEditMode(false);
    };

    const handleDeleteActivity = (
        event: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) => {
        setSubmitting(true);
        setTarget(event.currentTarget.name);
        agent.Activities.delete(id)
            .then(() => {
                setActivities([...activities.filter((a) => a.id !== id)]);
            })
            .then(() => setSubmitting(false));
    };

    const handleEditActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.update(activity)
            .then(() => {
                setActivities([
                    ...activities.filter((a) => a.id !== activity.id),
                    activity,
                ]);
                setSelectedActivity(activity);
                setEditMode(false);
            })
            .then(() => setSubmitting(false));
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    useEffect(() => {
        agent.Activities.list()
            .then((response) => {
                setActivities(response);
            })
            .then(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent content="Loading" />;

    return (
        <Fragment>
            <NavBar openCreateForm={handleOpenCreateForm} />
            <Container style={{ marginTop: "7em" }}>
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleSelectActivity}
                    selectedActivity={selectedActivity}
                    setSelectedActivity={setSelectedActivity}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    createActivity={handleCreateActivity}
                    editActivity={handleEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                    target={target}
                />
            </Container>
        </Fragment>
    );
};

export default App;
