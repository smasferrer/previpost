import { useState } from 'react'
import { useNavigate } from 'react-router'
import RecextFormSection from '../features/recext/components/RecextFormSection'
import RecextPageHeader from '../features/recext/components/RecextPageHeader'
import RecextResponsePanel from '../features/recext/components/RecextResponsePanel'
import RecextToolbar from '../features/recext/components/RecextToolbar'
import { useRecextAfpOptionsQuery } from '../features/recext/hooks/useRecextAfpOptionsQuery'
import { appPaths } from '../router/paths'

function ConsultaRecextPage() {
  const navigate = useNavigate()
  const [afp, setAfp] = useState('')
  const { data: afpOptions = [], isLoading, isError } = useRecextAfpOptionsQuery()

  const showForm = afp !== ''

  return (
    <main className="min-h-screen bg-[#1c1a22] px-4 py-6 text-[#f3f1e9] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1920px]">
        <RecextPageHeader />

        <div className="grid gap-5 xl:grid-cols-[1.03fr_0.97fr]">
          <section className="space-y-5">
            <RecextToolbar
              afp={afp}
              afpOptions={afpOptions}
              isLoading={isLoading}
              isError={isError}
              onAfpChange={setAfp}
              onSelectApiConsultas={() => navigate(appPaths.apiConsultas)}
            />

            <RecextFormSection showForm={showForm} />
          </section>

          <RecextResponsePanel />
        </div>
      </div>
    </main>
  )
}

export default ConsultaRecextPage
