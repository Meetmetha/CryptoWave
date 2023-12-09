import React, { useState } from 'react'
import LoggedInLayout from './LoggedInLayout'
import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

const Bond = () => {
    const [tab, setTab] = useState(0)
    const [chain, setChain] = useState(10)
    return (
        <>
            <div className=" bg-slate-400  mx-auto mt-2 p-2">
                <button onClick={() => setTab(0)} className={`${tab === 0 ? 'bg-white rounded-sm p-2' : ''}`}>Create bond</button>
                <button onClick={() => setTab(1)} className={`${tab === 1 ? 'bg-white rounded-sm p-2' : ''}`}>Redeem bond</button>
            </div>
            <div className=" border p-4 m-2">
                <p
                    className=' text-[#64748B]'
                >Make changes to your account here. Click save when you're done.</p>
                {
                    tab === 0 ?
                        (
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
                                    <TextField id="outlined-basic" label="Amount" variant="outlined" />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField id="outlined-basic" label="Enter key" variant="outlined" />
                                </FormControl>
                                <FormControl fullWidth>
                                    <Button variant="contained">Load contract</Button>
                                </FormControl>
                            </div>
                        ) :
                        (
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
                <div className=" pt-4">
                    <h2 className=' text-lg font-bold'>Active bonds</h2>
                    <div className="pt-2 flex flex-col gap-2">
                        <Card className='p-2' variant="outlined">
                            <p>
                                <b>4.5 DAI </b>
                                 $34.67
                            </p>
                            <p>Polygon</p>
                        </Card>
                        <Card className='p-2' variant="outlined">
                            <p>
                                <b>4.5 DAI </b>
                                 $34.67
                            </p>
                            <p>Polygon</p>
                        </Card>
                        <Card className='p-2' variant="outlined">
                            <p>
                                <b>4.5 DAI </b>
                                 $34.67
                            </p>
                            <p>Polygon</p>
                        </Card>
                        <Card className='p-2' variant="outlined">
                            <p>
                                <b>4.5 DAI </b>
                                 $34.67
                            </p>
                            <p>Polygon</p>
                        </Card>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Bond