class CardPool extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            cardListBacklog: [],
        };
    }

    componentWillMount(){
        axios.get('/cards').then(function(response){
            this.setState({cardListBacklog: response.data});
        }.bind(this));
    }

    render(){

        return(
            <div class="row">
                <Section name="Construction of Component 1 with a huge ass name that wont really fit in the section">
                    <Column columnName="BACKLOG">
                        <CardList id="card-list-1" column="0" cardList={this.state.cardListBacklog}/>
                    </Column>
                </Section>
            </div>
        );
    }
}