
import React, { Component } from 'react'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from "@material-ui/core/CardMedia"
import { Link } from "react-router-dom"


const styles = {
    card: {
        minWidth: 275,
        margin: 40,
        maxHeight: 320
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    image: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    hideOver: {
        overflow: "hidden",
        whiteSpace: "nowrap"
    }
};

export default class MakePostCard extends Component {

    render() {
        if (this.props.card.categorieId === "1"){
            return (
                <Link to={`/viewPost/${this.props.card.id}`} style={{ textDecoration: "none" }}>
                    <div id={this.props.card.id}>
                        <Card style={styles.card}>
                            <CardMedia style={styles.image} image={(this.props.card.photo.length) ? this.props.card.photo[0] : "https://images.unsplash.com/photo-1491924778227-f225b115dd5f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9cf2d396b2e5cb94bc449e2d91412ffe&auto=format&fit=crop&w=1350&q=80"} />
                            <CardContent>
                                <Typography variant="headline" style={styles.hideOver}>
                                    {this.props.card.title}
                                </Typography>
                                <Typography variant="title" component="h2" style={styles.hideOver}>
                                    Free
                        </Typography>
                                <Typography color="textSecondary" style={styles.hideOver}>
                                    {this.props.card.location}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div >
                </Link>
            )
        }
        else {
            let hasDollarSign = false
            if (this.props.card.price.slice(0, 1) == "$"){
                 hasDollarSign = true
            }
            return (
                    <div id={this.props.card.id}>
                        <Card style={styles.card}>
                            <CardMedia style={styles.image} image={(this.props.card.photo.length) ? this.props.card.photo[0] : "https://images.unsplash.com/photo-1491924778227-f225b115dd5f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9cf2d396b2e5cb94bc449e2d91412ffe&auto=format&fit=crop&w=1350&q=80"} />
                            <CardContent>
                                <Typography variant="headline" style={styles.hideOver}>
                                    {this.props.card.title}
                                </Typography>
                                <Typography variant="title" component="h2" style={styles.hideOver}>
                                    {(hasDollarSign) ? this.props.card.price : "$"+this.props.card.price}
                        </Typography>
                                <Typography color="textSecondary" style={styles.hideOver}>
                                    {this.props.card.location}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div >
            )
        }
    }
}