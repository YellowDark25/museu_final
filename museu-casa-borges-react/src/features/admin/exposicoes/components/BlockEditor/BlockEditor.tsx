"use client"

import { Fragment, useState } from "react"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { BlockDragPreview } from "./BlockDragPreview"
import { BlockItem } from "./BlockItem"
import { BlockTypeSelector } from "./BlockTypeSelector"
import type {
  SectionType,
  SectionDados,
  ExposicaoVirtualSecaoInputDTO,
  ExposicaoVirtualEditorBlock,
} from "@/features/admin/exposicoes/dto/admin-exposicoes.dto"

interface BlockEditorProps {
  /** Estado controlado — fonte única de verdade no componente pai (evita dessincronia). */
  blocks: ExposicaoVirtualEditorBlock[]
  onBlocksChange: (blocks: ExposicaoVirtualEditorBlock[]) => void
}

function createEmptyBlock(tipo: SectionType): ExposicaoVirtualEditorBlock {
  const localId = `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  switch (tipo) {
    case "text":
      return { localId, tipo, dados: { content: "" } }
    case "subtitle":
      return { localId, tipo, dados: { content: "" } }
    case "image":
      return { localId, tipo, dados: { src: "", alt: "", caption: "", href: "" } }
    case "image_grid":
      return { localId, tipo, dados: { items: [] } }
  }
}

function DropInsertionLine() {
  return (
    <div
      className="flex h-2 items-center px-0 py-0"
      aria-hidden
      role="presentation"
    >
      <div className="h-0 w-full rounded-full border-t-2 border-dashed border-red-400 bg-transparent shadow-[0_1px_0_0_rgba(248,113,113,0.35)]" />
    </div>
  )
}

export function BlockEditor({ blocks, onBlocksChange }: BlockEditorProps) {
  const [showTypeSelector, setShowTypeSelector] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  /** Índice onde a linha pontilhada aparece *antes* do bloco `blocks[index]` (ou `length` = após o último). */
  const [insertBeforeIndex, setInsertBeforeIndex] = useState<number | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function updateBlocks(newBlocks: ExposicaoVirtualEditorBlock[]) {
    onBlocksChange(newBlocks)
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
    setInsertBeforeIndex(null)
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) {
      setInsertBeforeIndex(null)
      return
    }

    const activeRect = active.rect.current.translated
    const overRect = over.rect
    if (!activeRect) {
      setInsertBeforeIndex(null)
      return
    }

    const pointerY = activeRect.top + activeRect.height / 2
    const overMiddle = overRect.top + overRect.height / 2
    const overIndex = blocks.findIndex((b) => b.localId === over.id)
    if (overIndex < 0) {
      setInsertBeforeIndex(null)
      return
    }

    setInsertBeforeIndex(pointerY < overMiddle ? overIndex : overIndex + 1)
  }

  function handleDragCancel() {
    setActiveId(null)
    setInsertBeforeIndex(null)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    setInsertBeforeIndex(null)

    if (!over || active.id === over.id) return

    const oldIndex = blocks.findIndex((b) => b.localId === active.id)
    const newIndex = blocks.findIndex((b) => b.localId === over.id)
    const reordered = arrayMove(blocks, oldIndex, newIndex)
    updateBlocks(reordered)
  }

  function handleAddBlock(tipo: SectionType) {
    const newBlock = createEmptyBlock(tipo)
    updateBlocks([...blocks, newBlock])
    setShowTypeSelector(false)
  }

  function handleUpdateBlock(localId: string, dados: SectionDados) {
    updateBlocks(
      blocks.map((b) => (b.localId === localId ? { ...b, dados } : b))
    )
  }

  function handleDeleteBlock(localId: string) {
    updateBlocks(blocks.filter((b) => b.localId !== localId))
  }

  const activeBlock = activeId ? blocks.find((b) => b.localId === activeId) : undefined

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b.localId)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block, index) => (
            <Fragment key={block.localId}>
              {activeId && insertBeforeIndex === index ? <DropInsertionLine /> : null}
              <BlockItem
                block={block}
                onUpdate={(dados) => handleUpdateBlock(block.localId, dados)}
                onDelete={() => handleDeleteBlock(block.localId)}
              />
            </Fragment>
          ))}
          {activeId && insertBeforeIndex === blocks.length ? <DropInsertionLine /> : null}
        </SortableContext>

        <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
          {activeBlock ? <BlockDragPreview block={activeBlock} /> : null}
        </DragOverlay>
      </DndContext>

      {showTypeSelector ? (
        <BlockTypeSelector
          onSelect={handleAddBlock}
          onCancel={() => setShowTypeSelector(false)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowTypeSelector(true)}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors"
        >
          + Adicionar bloco
        </button>
      )}
    </div>
  )
}

export function blocksToSecaoInputs(
  blocks: ExposicaoVirtualEditorBlock[]
): ExposicaoVirtualSecaoInputDTO[] {
  return blocks.map((block, index) => ({
    tipo: block.tipo,
    dados: block.dados as unknown as ExposicaoVirtualSecaoInputDTO["dados"],
    ordem: index,
  }))
}
