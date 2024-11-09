import Message from "./_components/message"
import ReturnButtons from "./_components/returnButtons"

const NotFound = () => {
  return (
    <div>
      <Message message="Page not found" subMessage="Woops apparently this page does not exist, check the url and retry."/>
      <ReturnButtons />
    </div>
  )
}

export default NotFound