
import SecondaryLayout from '@/Layout/SecondaryLayout'
import { Outlet } from 'react-router-dom'

const Secondary = () => {
    return (
        <>
            <SecondaryLayout>
                <Outlet />
            </SecondaryLayout>
        </>
    )
}

export default Secondary