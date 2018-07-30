
import React, { Component } from 'react'
import { Grid } from "@material-ui/core"
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from "@material-ui/core/CardMedia"
import { withStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon"
import AttachMoney from "@material-ui/icons/AttachMoney"
import { Link } from "react-router-dom"


const styles = {
    card: {
        minWidth: 275,
        margin: 40,
        maxHeight: 361
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
    }
};

export default class MakePostCard extends Component {
    constructor(props) {
        super(props)
        const { classes } = props;
    }
    render() {
        console.log("card thing", this.props.card)
        // return(<h1>TEST</h1>)
        // return (
        //     <Grid item sm>
        //     <div className="post-card" id={this.props.card.id}>
        //         <h3>{this.props.card.title}</h3>
        //         <h4>{this.props.card.price}</h4>
        //         <h4>{this.props.card.location}</h4>
        //         <h5>{this.props.card.categorie.cat}</h5>
        //         <p>{this.props.card.description}</p>
        //     </div>
        //     </Grid>
        // )
        return (
            // <Grid item>
            <Link to={`/viewPost/${this.props.card.id}`} style={{textDecoration:"none"}}>
            <div id={this.props.card.id}>
                <Card style={styles.card}>
                        <CardMedia style={styles.image} image="http://www4.pictures.zimbio.com/mp/xLY3uqp5MGax.jpg" />
                    <CardContent>
                        <Typography variant="headline">
                            {this.props.card.title}
                        </Typography>
                        <Typography variant="title" component="h2">
                            ${this.props.card.price}
                        </Typography>
                        <Typography color="textSecondary">
                            {this.props.card.location}
                        </Typography>
                        <Typography color="textSecondary">
                            {this.props.card.category}
                        </Typography>
                        <Typography component="p" style={{overflow: "wrap"}}>
                            {this.props.card.description}
                        </Typography>
                    </CardContent>
                </Card>
            </div >
            </Link>
            // </Grid>
        )
    }
}