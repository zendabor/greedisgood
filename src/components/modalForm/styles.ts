const formContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    inset: '50% 50%',
    transform: 'translate(-50%,-50%)'
}

const formBlock = {
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    maxWidth: 500,
    border: '2px solid #3939ac',
    borderRadius: '8px',
    backgroundColor: '#7b7070'
}

const hiddenInput = {
    width: 0,
    height: 0,
    opacity: 0,
    pointerEvents: 'none'
}


export default {
    formContainer,
    formBlock,
    hiddenInput
}