class CardList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            cardList: [],
            laneID: this.props.column
        }
    }

    componentWillMount(){
        this.setState({
            cardList: this.props.cardList,
        });
    }
render(){
        const {connectDropTarget} = this.props;

        return connectDropTarget(
            <div class={"card-list " + this.addClass()} id={this.props.id}>
                {   
                    this.state.cardList ?
                        this.state.cardList.map((card) => {
                            return <Card key={card.id} state={card} laneID={this.state.laneID}/>
                        })
                        : null
                }
            </div>
        );
    }   
}