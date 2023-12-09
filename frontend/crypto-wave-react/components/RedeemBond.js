import React from 'react'

const RedeemBond = () => {
    return (
        <div className=" flex flex-col gap-4 pt-2">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chain</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={chain}
                    label="Chain"
                // onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Token</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={chain}
                    label="Select token"
                // onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <TextField id="outlined-basic" label="Enter key" variant="outlined" />
            </FormControl>
            <FormControl fullWidth>
                <Button variant="contained">Sign to redeem</Button>
            </FormControl>
        </div>
    )
}

export default RedeemBond