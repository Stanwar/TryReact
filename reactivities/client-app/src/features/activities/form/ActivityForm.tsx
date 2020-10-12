import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
    activity: initialFormState,
    setEditMode,
    editActivity,
    createActivity,
    submitting,
}) => {
    const initializeFormState = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: "",
                title: "",
                category: "",
                description: "",
                date: "",
                city: "",
                venue: "",
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeFormState);

    const handleSubmit = () => {
        console.log(activity);
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    onChange={handleInputChange}
                    name="title"
                    placeholder="Title"
                    value={activity.title}
                />
                <Form.TextArea
                    onChange={handleInputChange}
                    name="description"
                    rows={2}
                    placeholder="Description"
                    value={activity.description}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name="category"
                    value={activity.category}
                    placeholder="Category"
                />
                <Form.Input
                    onChange={handleInputChange}
                    value={activity.date}
                    type="date"
                    name="date"
                    placeholder="Date"
                />
                <Form.Input
                    onChange={handleInputChange}
                    value={activity.city}
                    name="city"
                    placeholder="City"
                />
                <Form.Input
                    onChange={handleInputChange}
                    value={activity.venue}
                    name="venue"
                    placeholder="Venue"
                />
                <Button
                    loading={submitting}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                />
                <Button
                    onClick={() => setEditMode(false)}
                    floated="right"
                    type="button"
                    content="Cancel"
                />
            </Form>
        </Segment>
    );
};
