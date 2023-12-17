import React from 'react'
import { redirect } from "next/navigation";

import { initialProfile } from '@/lib/initial-profile'
import { db } from '@/lib/db'

type Props = {}

const SetupPage = async (props: Props) => {
    const profile = await initialProfile()
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/server/${server.id}`)
    }

    return (
        <div>Create Server</div>
    )
}

export default SetupPage