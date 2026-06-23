"use client"

import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button, Empty, Modal, Pagination, Tag, Typography } from "antd"
import type { PublicAcervoPhotoDTO } from "@/features/acervo/dto/public-acervo.dto"

interface PhotoGalleryProps {
  photos: PublicAcervoPhotoDTO[]
  className?: string
  pageSize?: number
  query?: {
    keyword?: string
    period?: "qualquer" | "antigo" | "moderno" | "recente"
  }
}

const MODAL_BG = "#0a0a0a"

export default function PhotoGallery({
  photos,
  className = "",
  pageSize = 10,
  query,
}: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  let filteredPhotos = photos
  if (query?.keyword && query.keyword.trim() !== "") {
    const kw = query.keyword.trim().toLowerCase()
    filteredPhotos = photos.filter((p) =>
      [p.title, p.description, p.alt].some((t) => t?.toLowerCase().includes(kw))
    )
  }
  if (query?.period && query.period !== "qualquer") {
    filteredPhotos = filteredPhotos.filter((photo) => {
      if (!photo.date) {
        return query.period === "qualquer"
      }

      const year = new Date(photo.date).getFullYear()
      if (query.period === "antigo") return year < 1950
      if (query.period === "moderno") return year >= 1950 && year < 2000
      if (query.period === "recente") return year >= 2000
      return true
    })
  }

  const totalPages = Math.max(1, Math.ceil(filteredPhotos.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const visiblePhotos = filteredPhotos.slice(startIndex, startIndex + pageSize)

  useEffect(() => {
    setCurrentPage(1)
    setSelectedPhoto(null)
    setIsModalOpen(false)
  }, [query, pageSize])

  const openModal = (index: number) => {
    setSelectedPhoto(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPhoto(null)
  }

  const navigatePhoto = (direction: "prev" | "next") => {
    if (selectedPhoto === null) return

    if (direction === "prev") {
      setSelectedPhoto(
        selectedPhoto > 0 ? selectedPhoto - 1 : filteredPhotos.length - 1
      )
    } else {
      setSelectedPhoto(
        selectedPhoto < filteredPhotos.length - 1 ? selectedPhoto + 1 : 0
      )
    }
  }

  const current = selectedPhoto !== null ? filteredPhotos[selectedPhoto] : null

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <Typography.Title level={3} className="!mb-2">
          Fotografias do Acervo
        </Typography.Title>
        <Typography.Paragraph type="secondary" className="!mb-0">
          Coleção de {filteredPhotos.length} fotografias históricas do Museu Casa
          Borges
        </Typography.Paragraph>
      </div>

      {filteredPhotos.length === 0 ? (
        <Empty
          description={
            <span>
              <Typography.Text strong className="block">
                Nenhuma fotografia disponível
              </Typography.Text>
              <Typography.Text type="secondary" className="mt-1 block">
                Ajuste os filtros ou publique novas fotografias no painel
                administrativo.
              </Typography.Text>
            </span>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visiblePhotos.map((photo, index) => (
              <motion.div
                key={startIndex + index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => openModal(startIndex + index)}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="truncate text-sm font-medium text-white">
                      {photo.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="flex justify-center">
              <Pagination
                current={currentPage}
                total={filteredPhotos.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          ) : null}
        </>
      )}

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width="min(96vw, 1200px)"
        destroyOnHidden
        closable
        mask={{ closable: true }}
        keyboard
        title={
          current ? (
            <span style={{ color: "#fafafa", fontWeight: 600 }}>{current.title}</span>
          ) : (
            <span style={{ color: "#fafafa" }}>Visualização</span>
          )
        }
        styles={{
          container: {
            padding: 0,
            background: MODAL_BG,
            overflow: "hidden",
            borderRadius: 12,
            boxShadow: "none",
          },
          header: {
            margin: 0,
            padding: "12px 16px",
            background: MODAL_BG,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          },
          body: {
            padding: 0,
            background: MODAL_BG,
          },
          mask: {
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <div className="flex flex-col bg-[#0a0a0a] text-white">
          <div className="relative flex min-h-[min(72vh,820px)] items-center justify-center px-12 pb-4 pt-2 sm:px-16">
            <span className="absolute left-4 top-4 z-20">
              <Tag className="!m-0 border-white/25 !bg-black/50 !text-white">
                {selectedPhoto !== null ? selectedPhoto + 1 : 0} /{" "}
                {filteredPhotos.length}
              </Tag>
            </span>

            <Button
              type="text"
              size="large"
              icon={<LeftOutlined className="!text-xl text-white" />}
              className="absolute left-1 top-1/2 z-20 !h-11 !w-11 -translate-y-1/2 border-0 !bg-white/12 hover:!bg-white/22 sm:left-2"
              onClick={(e) => {
                e.stopPropagation()
                navigatePhoto("prev")
              }}
              aria-label="Anterior"
            />

            {current ? (
              <div className="relative mx-auto aspect-auto h-[min(65vh,760px)] w-full max-w-5xl">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-contain"
                  sizes="96vw"
                  quality={90}
                  priority
                />
              </div>
            ) : null}

            <Button
              type="text"
              size="large"
              icon={<RightOutlined className="!text-xl text-white" />}
              className="absolute right-1 top-1/2 z-20 !h-11 !w-11 -translate-y-1/2 border-0 !bg-white/12 hover:!bg-white/22 sm:right-2"
              onClick={(e) => {
                e.stopPropagation()
                navigatePhoto("next")
              }}
              aria-label="Próxima"
            />
          </div>

          {current ? (
            <div
              className="border-t px-5 py-4 sm:px-6"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "#070707",
              }}
            >
              {current.description?.trim() ? (
                <Typography.Paragraph
                  className="!mb-0 !text-[15px] !leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  {current.description.trim()}
                </Typography.Paragraph>
              ) : (
                <Typography.Text type="secondary" className="!text-white/45">
                  Nenhuma descrição cadastrada para esta mídia (use o campo
                  &quot;Legenda&quot; no painel).
                </Typography.Text>
              )}
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  )
}
