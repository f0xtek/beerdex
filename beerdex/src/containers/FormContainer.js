import React, { Component } from 'react';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';

class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newBeer: {
                name: '',
                breweries: [],
                beerType: '',
                abv: '',
                tasteNotes: '',
            },
            beerTypes: ['IPA', 'American Pale', 'Lager', 'Session Ale', 'Golden Ale', 'Stout'],
            beerSubmitted: false,
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleBreweries = this.handleBreweries.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let beerData = this.state.newBeer;
        console.log(this.state.newBeer)

        fetch(process.env.BEERDEX_API_URL, {
            method: 'POST',
            body: JSON.stringify(beerData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => {
            response.json().then(data => {
                console.log(`Success: ${data}`);
                this.setState({beerSubmitted: true});
            })
        })
    }

    handleClearForm(e) {
        e.preventDefault(); // prevent page from being refreshed on form submission
        this.setState({
            newBeer: {
                name: '',
                breweries: [],
                beerType: '',
                abv: '',
                tasteNotes: '',
            }
        })
    }

    handleInput(e) {
        this.setState({newBeer: {[e.target.name]: e.target.value}});
    }

    handleBreweries(e) {
        const lines = e.target.value.replace(/\r\n/g,'\n').split('\n');
        const breweriesArray = lines.map(brewery => brewery);
        this.setState({newBeer: {[e.target.name]: breweriesArray}});
    }

    render() {
        return (
            <div className="container col-md-6">
                <form onSubmit={this.handleFormSubmit}>
                        <Input
                            type={'text'}
                            title={'Beer Name'}
                            name={'name'}
                            // value={this.state.newBeer.name}
                            placeholder={'Enter the beer name'}
                            handleChange={this.handleInput}
                        />{" "}
                        <TextArea
                            type={'text'}
                            title={'Breweries'}
                            name={'breweries'}
                            // value={this.state.newBeer.breweries}
                            placeholder={'Enter the breweries, one per line'}
                            rows={5}
                            handleChange={this.handleInput}
                        />{" "}
                        <Select
                            title={'Beer Type'}
                            name={'beerType'}
                            options={this.state.beerTypes}
                            // value={this.state.newBeer.beerType}
                            placeholder={'Select Beer Type'}
                            handleChange={this.handleInput}
                        />{" "}
                        <Input
                            type={'text'}
                            title={'ABV'}
                            name={'abv'}
                            // value={this.state.newBeer.abv}
                            placeholder={'Enter the beer ABV %'}
                            handleChange={this.handleInput}
                        />{" "}
                        <TextArea
                            type={'text'}
                            title={'Taste Notes'}
                            name={'tasteNotes'}
                            // value={this.state.newBeer.tasteNotes}
                            placeholder={'Enter some optional tasting notes'}
                            rows={10}
                            handleChange={this.handleInput}
                        />{" "}
                        <Button
                            title={'Submit'}
                            style={buttonStyle}
                            type={"primary"}
                            action={this.handleFormSubmit}
                        />
                        <Button
                            title={'Clear'}
                            style={buttonStyle}
                            type={"secondary"}
                            action={this.handleClearForm}
                        />
                    </form>
            </div>
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default FormContainer;
