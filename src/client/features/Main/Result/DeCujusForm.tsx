import React from 'react'

interface DeCujusFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, value: string) => void
}

const DeCujusForm = ({ handleSubmit }: DeCujusFormProps) => {

  const [value, setValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event, value)}>
      <label>
        De Cujus :
            <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default DeCujusForm