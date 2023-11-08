
import {Controller} from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'

export default function RTE ({name,control,defaultValue="",label}) {

  return (
   <div className='w-full'>
    {label && <label>{label}</label>}
    <Controller
     name={name || "content"}
     control={control}
     render={({field:{onchange}})=>(
        <Editor
        initialValue={defaultValue}
        init = {{
            height:500,
            menubar:true,
            plugins: [
                // 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor',
                // 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                // 'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount'
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
            toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style : 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}

        onEditorChange={onchange}
        />
     )}
    />
   </div>
  )
}


