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
        <div className="">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center bg-[rgb(8,43,61)] text-white px-32 text-center sticky top-16 py-3">{blog?.heading}</h1>
                <p className="mb-4 pt-4 text-lg px-32" dangerouslySetInnerHTML={formatText(blog?.intro)} />

            {/* Blog Sections */}
            {blog.sections.map((member, index) => (
                <div key={index} className="mb-8 pt-8 text-lg mx-32">

                    { member.title && <h2 className="text-2xl font-bold mb-1">{member?.title}</h2>}
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
