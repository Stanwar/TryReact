import React from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/activity";
import {format} from 'date-fns';

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
    activity,
}) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image
                            size="tiny"
                            circular
                            src="/assets/user.png"
                        />
                        <Item.Content>
                            <Item.Header as="a">{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>
                                    {activity.city}, {activity.venue}
                                </div>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                {/* <Icon name="clock" /> {activity.date.toString()} */}
                <Icon name="marker" /> {activity.venue} , {activity.city}
            </Segment>
            <Segment secondary> Attendees will go here </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    floated="right"
                    content="view"
                    color="blue"
                ></Button>
            </Segment>
        </Segment.Group>
    );
};
