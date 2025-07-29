import { getBlogWithId } from "@/firebase/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const formatText = (text) => {
    const parts = text.split('||').map((part) =>
        part.replace(/''(.*?)''/g, '<strong>$1</strong>')
    );
    const html = parts.join('<br />');
    return { __html: html };
};

function Blog() {
    let { id } = useParams();
    let [blog, setBlog] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlogWithId(id).then((res) => {
            setBlog(res);
            setLoading(false);
        })
    }, [id])

    if (loading) {
        return <div className="min-h-[41vh] flex justify-center items-center text-2xl font-semibold">Loading...</div>
    }
    return (
        <div className="px-32 py-10  text-gray-800">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4 flex items-center">{blog?.heading}</h1>
                <p className="mb-4 text-lg" dangerouslySetInnerHTML={formatText(blog?.intro)} />
            </div>

            {/* Blog Sections */}
            {blog.sections.map((member, index) => (
                <div key={index} className="mb-8 pt-8 border-t-2 border-[rgb(8,43,61)] text-lg">

                    { member.title && <h2 className="text-2xl font-bold mb-1">🔹 {member?.title}</h2>}
                    {
                        member.items.map((item, idx) => (
                            <div className="" key={idx}>
                                {
                                    item.type === "subtitle" ? (
                                        <span className="text-lg font-semibold">{item.content}</span>
                                    )
                                        :
                                        (
                                            item.type === "description" ?
                                                <p className="my-3" dangerouslySetInnerHTML={formatText(item.content)} /> :
                                                item.type === "list" ?
                                                <div className="space-y-1 my-3">
                                                    <p dangerouslySetInnerHTML={formatText(item.heading)} />
                                                    <ul className="list-disc ml-5">
                                                        {
                                                            // console.log(item.content)
                                                            item?.content.map((list, i) => (
                                                                <li key={i} className="py-0.5" dangerouslySetInnerHTML={formatText(list)}/>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>: null
                                        )}
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    )
}

export default Blog
