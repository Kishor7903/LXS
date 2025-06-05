import DialogBox from './DialogBox'

function ConfirmationPopp({ isOpen, setIsOpen, heading, description, onClick }) {

  return (
    <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} className="max-w-[31vw] bg-white rounded-xl flex flex-col overflow-hidden" parentDivClassName="flex justify-center items-center">
      <h2 className="text-center text-xl font-bold border-b border-[rgb(8,43,61,0.4)] p-4 flex gap-1 justify-center items-center bg-slate-100 ">
        {heading}
      </h2>
      <p className='px-10 mt-60 text-sm text-center' style={{ whiteSpace: 'pre-line' }}>
        {description}
      </p>
      <div className="flex gap-10 justify-center my-5">
        <button
          className="border-2 font-semibold border-[rgb(8,43,61)] h-10 px-5 rounded-full lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          className="h-10 w-28 rounded-full font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-white lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]"
          onClick={onClick}
        >
          Confirm
        </button>
      </div>
    </DialogBox>
  )
}

export default ConfirmationPopp
