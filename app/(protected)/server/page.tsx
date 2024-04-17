
import { UserInfo } from '@/components/user-info'
import { CurrentUser } from '@/lib/auth'

import React from 'react'

type Props = {}

const Server = async (props: Props) => {

    const user = await CurrentUser()
    
    // const labelContent = "Server Component"
    // const serverlogoElement = <ServerLogo />

    // const labelValue = (
    //     <div className="text-center flex justify-center items-center gap-x-1">
    //          {serverlogoElement}
    //          {labelContent}
    //     </div>
    // )

    return (
        <div>
            <UserInfo
                label={"💻 Server Component"}
                user={user} />
        </div>
    )
}

export default Server