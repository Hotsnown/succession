import React from 'react'

interface DeCujusFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, value: string) => void
} 

interface DeCujusFormState {
    value: string
}

class DeCujusForm extends React.Component<DeCujusFormProps, DeCujusFormState> {
    constructor(props: DeCujusFormProps) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({value: event.target.value});
    }
  
    render() {
      return (
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.props.handleSubmit(event, this.state.value)}>
          <label>
            De Cujus :
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default DeCujusForm