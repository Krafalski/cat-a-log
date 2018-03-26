

//////////////////////////////////////
// Show All the cats inside a main tag
/////////////////////////////////////

class Main extends React.Component {
  constructor(){
    super()
    this.state = {
      cats : []
    }
  }


  componentDidMount() {
    fetch('/cats.json')
    .then( results => {
      return results.json();
    }).then( data =>{
      let cats = data.map((cat, index) => {
        // console.log(cat.id, index);
        return(
          <div key={cat.id.toString()}>
            <h2>Name: {cat.name} </h2>
            <h3>Age: {cat.age}</h3>
            <h4>Color: {cat.color}</h4>
            <img src={cat.image} />
            <button onClick={deleteCat} id={cat.id}> delete</button>
          </div>
        )
      })
      this.setState({cats: cats});

      function deleteCat (event){
        console.log(event.target.id);
        fetch('cats/'+ event.target.id + '.json', {
          method: 'DELETE',
          headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
        })
        .then(data => console.log('response data' , data))
        .catch(error=> console.error(error))
      }
    })
    this.setState  ({submitted: true})
  }

  render (){
    return (
      <div className="card">
       {this.state.cats}
      </div>
    )
  }
}

//////////////////////////////////////
// Create a Cat
/////////////////////////////////////

class CreateACat extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      age: '',
      color: '',
      image: ''
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      submitted: false,
      [event.target.name] :event.target.value
    });
  }

  handleSubmit(event){
    this.setState({
      submitted: true
    })
    event.preventDefault();
    alert('A name was submitted:' + this.state.name + "An age was submitted" + this.state.age)
    fetch('cats', {
      body: JSON.stringify(this.state),
      method: 'POST',
      headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
}
    })
    .then(data => console.log('response data' , data))
    .catch(error=> console.error(error))
  }
  render () {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
        Name:
          <input type="text" name="name" onChange={this.handleChange} />
          <input type="text" name="age" onChange={this.handleChange} />
          <input type="text" name="color" onChange={this.handleChange} />
          <input type="text" name="image" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

//////////////////////////////////////
// Delete a Cat
/////////////////////////////////////


//////////////////////////////////////
// Render that whole thing
/////////////////////////////////////

ReactDOM.render(
  <section>
    <h1 className="foo">Cat-A-Log!</h1>
    <CreateACat></CreateACat>
    <Main></Main>
  </section>,
  document.querySelector('main')
);
