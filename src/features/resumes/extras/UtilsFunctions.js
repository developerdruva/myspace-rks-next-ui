import { useReactToPrint } from "react-to-print"

export const sideHeading = (text) => {
    return <div className='m-0' style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '14px', margin: '0', padding: "0" }}>
        {text}
    </div>
}

// export const reactToPrint = () => {
//     const handlePrint = useReactToPrint({
//     })
// }