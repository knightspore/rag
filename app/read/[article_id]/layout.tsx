/** @format */

export default function ReadArticleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <article className="p-4 pb-12 mx-auto space-y-4 prose prose-invert line-clamp">
            {children}
        </article>
    );
}
