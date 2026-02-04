import { PreviewText } from './PreviewText';

type PreviewNotesProps = {
    notes: string;
    placeholder: string;
};

export function PreviewNotes({ notes, placeholder }: PreviewNotesProps) {
    return (
        <div className="mt-auto px-4 pb-3">
            <h4 className="mb-1 text-[10px] text-text-weak">Notes</h4>
            <p className="min-w-0 text-[10px] wrap-break-word whitespace-pre-wrap text-text-default">
                <PreviewText value={notes} placeholder={placeholder} />
            </p>
        </div>
    );
}
